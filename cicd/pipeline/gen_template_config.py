#!/usr/bin/env python3

###
# Generate the template configuration, used to pass in the parameters to the
# CloudFormation template and add aws resource tags
# Usage: gen_template_config.py --template [/path/to/template_config.json]

import argparse
import os
import jinja2

parser = argparse.ArgumentParser()

parser.add_argument("--template", "-t", help="The j2 template", required=True)

args = parser.parse_args()

# load the j2 template
template_loader = jinja2.FileSystemLoader(searchpath="./")
template_env = jinja2.Environment(loader=template_loader)
template = template_env.get_template(args.template)

# get the values from the environment
template_vals = {
    "branch"            : os.environ['SRC_BRANCH'],
    "bucket_name"       : os.environ['SOURCE_BUCKET'],
    "bucket_path"       : os.environ['BUCKET_PATH'],
    "build"             : os.environ['CODEBUILD_BUILD_NUMBER'],
    "clean_branch"      : os.environ['CLEAN_BRANCH'],
    "commit_id"         : os.environ['COMMIT_ID'],
    "environment"       : os.environ['ENVIRONMENT'],
    "hosted_zone"       : os.environ['HOSTED_ZONE'],
    "product_component" : os.environ['PRODUCT_COMPONENT'],
    "product_name"      : os.environ['PRODUCT_NAME'],
    "ssl_certificate"   : os.environ['SSL_CERTIFICATE'],
    "sub_domain"        : os.environ['SUB_DOMAIN'],
}

# do the substitution
output_text = template.render(template_vals)

print(output_text)
