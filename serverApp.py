from flask import Flask, redirect, url_for, render_template, request
from keras.datasets import mnist
import matplotlib.pyplot as plt
import cv2
import numpy as np
import keras as keras
from keras.models import Sequential
from keras.layers import Dense, Flatten, Conv2D, MaxPool2D, Dropout
from keras.optimizers import SGD, Adam
from keras.callbacks import ReduceLROnPlateau, EarlyStopping
from keras.utils import to_categorical
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from keras.utils import np_utils
import matplotlib.pyplot as plt
from tqdm import tqdm_notebook
from sklearn.utils import shuffle
import tensorflow as tf
from tensorflow.keras import backend
from tensorflow.keras.models import load_model
import sys
import urllib

app = Flask(__name__)

model = load_model('model_hand.h5')

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods = ['POST'])
def predict():
    
    data = request.form.get('signatureBlob')
    target = request.form.get('targetAlphabet')
    
    response = urllib.request.urlopen(data)
    
    with open('image.jpg', 'wb') as f:
        f.write(response.file.read())
        
    # Dictionary for getting characters from index values...
    word_dict = {0:'A',1:'B',2:'C',3:'D',4:'E',5:'F',6:'G',7:'H',8:'I',9:'J',10:'K',11:'L',12:'M',13:'N',14:'O',15:'P',16:'Q',17:'R',18:'S',19:'T',20:'U',21:'V',22:'W',23:'X', 24:'Y',25:'Z'}
    
    # Prediction on external image...

    img = cv2.imread('image.jpg')
    img_copy = img.copy()

    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = cv2.resize(img, (400,440))

    img_copy = cv2.GaussianBlur(img_copy, (7,7), 0)
    img_gray = cv2.cvtColor(img_copy, cv2.COLOR_BGR2GRAY)
    _, img_thresh = cv2.threshold(img_gray, 100, 255, cv2.THRESH_BINARY_INV)

    img_final = cv2.resize(img_thresh, (28,28))
    img_final =np.reshape(img_final, (1,28,28,1))
    
    img_final = tf.cast(img_final, tf.float32)
    
    img_pred = word_dict[np.argmax(model.predict(img_final))]
    
    if img_pred == target:
        result = "Correct"
    else:
        result = "Incorrect"
        
    return render_template("index.html",prediction_result = result, target = target, actual = img_pred);


if __name__ == "__main__":
    app.run()