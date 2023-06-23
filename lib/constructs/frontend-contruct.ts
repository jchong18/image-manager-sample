import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export interface FrontendConstructProps {
  prefix?: string;
}

export class FrontendConstruct extends Construct {

  constructor(scope: Construct, id: string, props?: FrontendConstructProps) {
    super(scope, id);

    const s3Bucket = new s3.Bucket(this, 'FrontendBucket');

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(s3Bucket),
      },
      defaultRootObject: 'index.html',
    });

    new s3Deployment.BucketDeployment(this, 'FrontendDeployment', {
      sources: [s3Deployment.Source.asset('./frontAssets')],
      distribution: distribution,
      destinationBucket: s3Bucket,
    });
  }
}
