1) First is the node.js application, a simple API-based app with no complex functionalities.

2) I have created the docker file for the node.js application.

3) I have divided my CI/CD file inside .github/workflows into 4 parts =>



        a) Test: It is done by the npm run test command which has a very simple test script.
        b) Build and Push: The next step will cause the image to be created and pushed into the docker hub. We can configure it to push into AWS ECR also.
        c) Deploy: The deployment part is done on the local cluster as my already present AWS cluster has some payment issues.
        d) Response: The last is to notify the panel having a configuration to notify the user. We can notify users on Slack or anything else but I have just added very basic notifications on logs.

4) The rest of the configuration files are made as per the standards and documentation.
