provider "aws" {
  region = "eu-west-1"
}

data "aws_route53_zone" "main" {
  name = "always.fail"

  private_zone = false
}

resource "aws_s3_bucket" "logs" {
  bucket = "always-fail-logs"

  tags = {
    Name = "always-fail-logs"
    Desc = "Bucket for always.fail logs."
    env = "prod"
    made_by = "terraform"
  }
}

resource "aws_s3_bucket_acl" "logs" {
  bucket = aws_s3_bucket.logs.id
  acl    = "private"
}

resource "aws_s3_bucket" "main" {
  bucket = "always-fail-resources"

  tags = {
    Name = "always-fail-resources."
    Desc = "Static resources for always.fail domain."
    env = "prod"
    made_by = "terraform"
  }
}

resource "aws_s3_bucket_website_configuration" "main" {
  bucket = aws_s3_bucket.main.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket_acl" "main" {
  bucket = aws_s3_bucket.main.id
  acl    = "public-read"
}

resource "aws_acm_certificate" "main" {
  domain_name = "always.fail"

  validation_method = "DNS"

  subject_alternative_names = [
    "*.always.fail",
    "*.eventually.always.fail",
    "*.should.always.fail",
    "*.statistically.always.fail",
    "*.will.always.fail",
  ]

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "main" {
  for_each = {
    for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true

  name    = each.value.name
  records = [each.value.record]
  ttl     = 60
  type    = each.value.type
  zone_id = data.aws_route53_zone.main.zone_id
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for record in aws_route53_record.main : record.fqdn]
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.main.bucket_regional_domain_name}"
    origin_id   = "always-fail-origin"
    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = ["TLSv1.1", "TLSv1.2"]
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CloudFront made by terraform"
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = "${aws_s3_bucket.logs.bucket_domain_name}"
    prefix          = "cloudfront"
  }

  aliases = ["always.fail", "*.always.fail"]

  default_cache_behavior {
    allowed_methods  = ["HEAD", "GET"]
    cached_methods   = ["HEAD", "GET"]
    target_origin_id = "always-fail-origin"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    compress = true
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    max_ttl                = 86400
    default_ttl            = 120
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "blacklist"
      locations        = ["KP", "NG"]
    }
  }

  tags = {
    Name = "always-fail-cf"
    Desc = "CloudFront for distributing always.fail static resources."
    env = "prod"
    made_by = "terraform"
  }

  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate.main.arn}"
    minimum_protocol_version = "TLSv1.2_2021"
    cloudfront_default_certificate = false
    ssl_support_method = "sni-only"
  }
}
