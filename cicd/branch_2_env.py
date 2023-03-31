#!/usr/bin/env python3

###
# convert the current code branch to an environment, used to load the appropriate environment vars
# Usage: ./branch_2_env.py --branch [code-branch]

import argparse
import re

parser = argparse.ArgumentParser()

parser.add_argument("--branch", "-b", help="The code branch that triggered this build", required=True)

args = parser.parse_args()

# associate the branch with an environmant 
if re.search('^main$', args.branch):
  #print(f"Branch {args.branch} matched main")
  print('production')
elif re.search('^release.*$', args.branch):
  #print(f"Branch {args.branch} matched release")
  print('staging')
elif re.search('^testing$', args.branch):
  #print(f"Branch {args.branch} matched testing")
  print('testing')
else:
  #print(f"Branch {args.branch} didnt match")
  print('development')
   
