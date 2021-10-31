# zappar-on-the-fly-image-train
Node.js API for @zappar/image-traning sdk to train images on the fly  


## Introduction
ZapWorks is the most robust AR toolkit for companies who want to push the boundaries of creativity and storytelling. Using the ZapWorks ecosystem, you can rapidly build, publish, analyze and scale immersive AR experiences across the complete customer journey.


Zappar's image tracking augmented reality technology lets you attach 3D content to known images in a camera view. This API use the power of zappar/image-training sdk to train normal images in .zpt files for later use 




## How to get started

1. Clone the repo
   ```sh
   git clone https://github.com/obeymyshinnyrod/zappar-on-the-fly-image-train
   ```
2. Install the NPM packages
   ```sh
   npm install
   ```
3. To serve the API locally 
    ```sh
   npm start
     ```
4. The API is running on port 5000 at localhost:5000


## Working Overview
This API receive image as buffer data save that buffer data as file at ``` upload/images``` this image gets deleted after it has been trained by the ```train``` function then fetch the image inside the train function via file path and train the image and send the buffer data back as a response the response buffer data is the trained .zpt file that can be later used to track the image for AR.

## Deployment
After setting up the repo you can deploy the API on a live server to train images on the fly for that we are going to use heroku before starting make sure you have a heroku account it's free and we are going to use it to deploy our API if you don't have an account head over to https://signup.heroku.com/login to create a new account.

1. First we will need the heroku cli for that we can use npm
   ```sh
    npm install -g heroku
    ```
2. After installing the cli we need to login to our account type
     ```sh
   heroku login
     ```
      
3. After login we need to push the repository to heroku for that use 
    ```sh
   git push heroku HEAD:master
     ```
 4. After that check logs and you'll have the link to your repository as it's live after pushing 


## For More Documentation 
1. <p><a href="https://www.npmjs.com/package/@zappar/imagetraining">@zappar/imagetraining</a></p>
2. <p><a href="https://docs.zap.works/">Zapworks</a></p>
3. <p><a href="https://devcenter.heroku.com/categories/reference">Heroku</a></p>


