#!/usr/bin/env python3

###
# Genarate the environment vars file for the current environment.
# Usage: gen_env_vars.py --env [development|testing|staging|production] --conf [/path/to/conf.ini]

import argparse
import configparser
import os

parser = argparse.ArgumentParser()

parser.add_argument("--env", "-e", help="The environment we are running in", required=True)
parser.add_argument("--conf", "-c", help="Path to the config file. Default: config.ini", required=False, default="config.ini")
parser.add_argument("--clean-branch", "-cb", help="The clean branch name, used for resource naming", required=True)

args = parser.parse_args()

config_defaults = {
                     'CLEAN_BRANCH' : args.clean_branch,
                     'ENVIRONMENT'  : args.env,
                     'AWS_ACCOUNT_ID' : os.popen('aws sts get-caller-identity --query Account --output text').read().strip()[:6],
                  }

# read the config file
config = configparser.ConfigParser(defaults=config_defaults, interpolation=configparser.ExtendedInterpolation())
config.read(args.conf)

# get values for the relevant environment
env_config = config[args.env]

# print key/vals
for key in env_config:
  value = env_config[key].replace("\n", "")
  print(f"{key.upper()}={value}")

