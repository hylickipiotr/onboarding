import * as Cdk from "aws-cdk-lib/core";

import { OnboardingStack } from "../lib/OnboardingStack";

const app = new Cdk.App();

new OnboardingStack(app, 'OnboardingStack');
