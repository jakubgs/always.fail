provider "aws" {
  region = "eu-west-1"
}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "S3 origin access identity for always.fail"
}

resource "aws_s3_bucket" "logs" {
  bucket = "always-fail-logs"
  acl    = "private"

  tags {
    Name = "always-fail-logs"
    Desc = "Bucket for always.fail logs."
    env = "prod"
    made_by = "terraform"
  }
}

resource "aws_s3_bucket" "static" {
  bucket = "always-fail-resources"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }

  tags {
    Name = "always-fail-resources."
    Desc = "Static resources for always.fail domain."
    env = "prod"
    made_by = "terraform"
  }
}

resource "aws_s3_bucket_policy" "static" {
  bucket = "${aws_s3_bucket.static.id}"
  policy =<<POLICY
{
  "Id": "AllowPublicAccess",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowPublicAccess",
      "Action": [ "s3:GetObject" ],
      "Effect": "Allow",
      "Resource": "${aws_s3_bucket.static.arn}/*",
      "Principal": "*"
    }
  ]
}
POLICY
}


variable "certificate_arn" {
  default = "arn:aws:acm:us-east-1:280372861904:certificate/05fd72e2-189f-4dba-8ca7-67cda8cc96f7"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "${aws_s3_bucket.static.website_endpoint}"
    origin_id   = "always-fail-origin"
    custom_origin_config {
      http_port = 80
      https_port = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols = ["TLSv1", "TLSv1.1", "TLSv1.2"]
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

  tags {
    Name = "always-fail-cf"
    Desc = "CloudFront for distributing always.fail static resources."
    env = "prod"
    made_by = "terraform"
  }

  viewer_certificate {
    acm_certificate_arn = "${var.certificate_arn}"
    minimum_protocol_version = "TLSv1.1_2016"
    cloudfront_default_certificate = false
    ssl_support_method = "sni-only"
  }
}
