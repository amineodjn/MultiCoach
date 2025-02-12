# Deployment Instructions

To deploy the Vue.js application using AWS CDK:

1. First, build your Vue.js application:
```bash
npm run build
```
This will create a `dist` directory with the production build.

2. Install CDK dependencies in the `my-cdk-multicoach` directory:
```bash
cd my-cdk-multicoach
npm install
```

3. Deploy the stack:
```bash
cdk deploy
```

After deployment completes, the CloudFront distribution URL will be displayed in the outputs. You can access your application using this URL.

Note: The current configuration includes settings that are not recommended for production:
- `removalPolicy: DESTROY` - This will delete the S3 bucket when the stack is destroyed
- `autoDeleteObjects: true` - This will automatically delete all objects in the bucket when the stack is destroyed

For production deployments, you should consider modifying these settings to prevent accidental data loss.