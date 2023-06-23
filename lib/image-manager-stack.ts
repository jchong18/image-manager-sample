import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FrontendConstruct } from './constructs/frontend-contruct';
import { ResourcesConstruct } from './constructs/resources-construct';

export class ImageManagerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const frontendConstruct = new FrontendConstruct(this, 'Frontend');
    const resourcesConstruct = new ResourcesConstruct(this, 'Resources');
  }
}
