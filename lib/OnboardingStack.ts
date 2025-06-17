import * as path from "path";

import { Construct } from "constructs";

import * as CloudFront from "aws-cdk-lib/aws-cloudfront";
import * as CloudFrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as S3 from "aws-cdk-lib/aws-s3";
import * as S3Deployment from "aws-cdk-lib/aws-s3-deployment";
import * as Cdk from "aws-cdk-lib/core";

import { ResourceNamingService } from "./ResourceNamingService";

export class OnboardingStack extends Cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const resourceNamingService = new ResourceNamingService({
      appName: 'onboarding',
    });

    const bucket = new S3.Bucket(this, 'Bucket', {
      bucketName: resourceNamingService.generate('bucket'),
      autoDeleteObjects: true,
      publicReadAccess: true,
      blockPublicAccess: new S3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      removalPolicy: Cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
    });

    const distribution = new CloudFront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        viewerProtocolPolicy: CloudFront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        origin: new CloudFrontOrigins.S3StaticWebsiteOrigin(bucket, {
          originId: resourceNamingService.generate('origin'),
        }),
        cachePolicy: CloudFront.CachePolicy.CACHING_OPTIMIZED,
        originRequestPolicy: new CloudFront.OriginRequestPolicy(
          this,
          'OriginRequestPolicy',
          {
            originRequestPolicyName: resourceNamingService.generate(
              'origin-request-policy'
            ),
            cookieBehavior: CloudFront.OriginRequestCookieBehavior.none(),
            headerBehavior: CloudFront.OriginRequestHeaderBehavior.allowList(
              'accept-control-request-headers',
              'origin',
              'user-agent'
            ),
            queryStringBehavior:
              CloudFront.OriginRequestQueryStringBehavior.none(),
          }
        ),
      },
      defaultRootObject: 'index.html',
    });

    new S3Deployment.BucketDeployment(this, 'BucketDeployment', {
      sources: [
        S3Deployment.Source.asset(path.join(import.meta.dirname, '../dist')),
      ],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ['/*'],
      prune: true,
    });

    new Cdk.CfnOutput(this, 'DistributionDomainName', {
      value: `https://${distribution.domainName}`,
      description: 'CloudFront Distribution Domain Name',
      exportName: `domain-name`,
    });
  }
}
