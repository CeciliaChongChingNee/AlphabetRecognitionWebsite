# HANDWRITTEN CHARACTER RECOGNITION USING CONVOLUTIONAL NEURAL NETWORK

## A. PROJECT SUMMARY

**Project Title:** Handwritten Character Recognition

**Team Members:** 
- Cecilia Chong Ching Nee (B031910390)
- Siew Chung Seng (B031910342)
- Vishan Menan A/L Balakrishnan (B031910018)
- Muhammad Putra Alif Bin Ismail (B031910115)

- [ ] **Objectives:**
- to develop a character recognition system
- to prepare dataset for model training of character recognition system
- to predict character accurately with handwritten character recognition system


##  B. ABSTRACT 

Learning how to write the alphabet is one of the first steps in your child's journey of learning. By ages four to five, children will start writing letters. Children will learn to write the alphabet in preschool and kindergarden, bu it may be beneficial to have your child practice writing letters at home. Therefore, nowadays, some of the parents buy a handwriting workbook and get their child to go through the exercise in it page by page. However, this method need a lot of paper to practice the characters. In addition, it is more difficult for children to judge whether the alphabet that written by them are correct or wrong. 

The best way to teach the children to write the alphabet is doing practice using AI technology. Children can use this handwritten character recognition system to check their understanding quickly. It is because this system can predict what is the character that write in the text field provided and display the result. If the result is correct, it means that the child able to write this letter and know how to write it properly. 

![Coding](https://github.com/CeciliaChongChingNee/Artificial-Intelligence-Project/blob/main/AI-Project-Documentation/poster-handwrting.jpg)

Figure 1 shows the alphabet that will be learnt by the child and we will use them in this system


## C.  DATASET
This project will be split into 3 parts, which are:
- Preprocessing : Here we will focus on preprocessing the data to allow for better training results
- Training : Here we will focus on the training of the model and the validation of training results
- Deployment : In this stage we will deploy the model by loading it and allow user to interact with it through GUI such as website

Our dataset for training are shown as below:
![image](https://user-images.githubusercontent.com/80866120/115016783-224cec80-9ee8-11eb-8147-88782634bd45.png)

Figure 2 shows sample of the data used for training the model

The dataset we'll be using contains 26 folders (A-Z) containing handwritten images in size 2828 pixels, each alphabet in the image is centre fitted to 2020 pixel box.

Each image is stored as Gray-level

Kernel CSVToImages contains script to convert .CSV file to actual images in .png format in structured folder.

The images are taken from NIST(https://www.nist.gov/srd/nist-special-database-19) and NMIST large dataset and few other sources which were then formatted as mentioned above.

Furthermore, we also developed a simple signature pad website that allow us collect actual data that would be use for model prediction during deployment. These images are written by using the same signature pad intended for deployment therefore simulating the actual performance. These data will be stored in another folder but in a similar manner and be only used for testing the model accuracy.

Our goal is to train a CNN model that is capable of predicting/recognizing the inputted image of a character.

## D.   PROJECT STRUCTURE
The following directory is our structure of our project

    E:.
    │   alphabet.yml
    │   AlphabetData.zip
    │   A_Z Handwritten Data.csv
    │   Final Project Notebook.ipynb
    │   image.jpg
    │   model_hand.h5
    │   README.md
    │   serverApp.py
    │
    ├───.ipynb_checkpoints
    │       Final Project Notebook-checkpoint.ipynb
    │
    ├───static
    │       app.js
    │       index.css
    │       index.js
    │       title.png
    │
    └───templates
            index.html
            website.html


## E   TRAINING THE HANDWRITTEN CHARACTER RECOGNITION MODEL
We are now ready to train our model using Keras, Tensorflow, and CNN.

Firstly, navigate to the project folder containing the files.
Then we shall open up jupyter notebook to preprocess, train and test the model.
We shall do that with the following command:

$jupyter notebook

Open the notebook named "Final Project Notebook.ipynb" and run all the source code in the notebook.
First we will load the dataset and preprocess it. Next, we will split the data into 8:2 ratio for training and testing data.
80% of the data will be the training data and the remaining 20% will be testing data. After that, we will train the model and validate
the result using the test data.

Lastly, we shall deploy the model with the following command

$python serverApp.py

This will deploy the flask web application to test and use our model and will be hosted at localhost:5000.
To port forward this localhost website to the public domain, we will be using ngrok to host it.

We will port forward it to the public domain using the following command:

$ngrok http 5000

The public address is then shown and can be used to access the website anywhere with an internet connection.

## F.  RESULT AND CONCLUSION

The following is the test result of our model against 74490 test images:

![image](https://user-images.githubusercontent.com/33794652/120072832-3fb8cd00-c0c8-11eb-99cf-97faea98291f.png)

Figure 3 shows result of model training and validation

As shown in the figure above, we are able to get an accuracy of 95% on our model.

![image](https://user-images.githubusercontent.com/33794652/120072933-b786f780-c0c8-11eb-99ed-0d6b9317b63a.png)

Figure 4 shows result by using handwritten character recognition web application

## G.   PROJECT PRESENTATION 

In this project, you will be able to create a Handwritten character recoginition system using Keras, TensorFlow and CNN. To create the model we collect image of handwritten character and preprocessed them into csv for training purpose. We fine-tuned the model and is able to obtained a classifier that is 95% accurate.

We then load this model on a server that allows user to draw a character and use it to predict/recognize what did the user wrote.

[![demo](https://img.youtube.com/vi/u3FLVbNn9Os/0.jpg)](https://www.youtube.com/watch?v=u3FLVbNn9Os "demo")


