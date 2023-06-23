import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deployment from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from 'constructs';

export class ResourcesConstruct extends Construct {

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const s3Bucket = new s3.Bucket(this, 'ResourcesBucket');

    const cfFunction = new cloudfront.Function(this, 'ResourcesPathRedirectFunction', {
      code: cloudfront.FunctionCode.fromFile(
        {
          filePath: './cfFunction/function.js',
        }
      ),
    });

    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(s3Bucket),
        functionAssociations: [{
          function: cfFunction,
          eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
        }],
      },
    });
  }
}
