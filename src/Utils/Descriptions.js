const Desc = {
    'AboutMe': {   
        'Who': 'My name is Robert and I am from Houston, Texas. I am a recent graduate from the University of Houston with a Bachelors of Science in Computer Science and a Minor in Mathetmatics. My relevant coursework GPA for Computer Science is a 3.5 and I have an affinity for learning new technologies and meeting like minded individuals.',
    },
    'Earthquake': {
        'Intro': 'The Early Earthquake Detection/Warning system is an application made in Python that utilizes a dataset from Kaggle which contains geospatial data on earthquakes in the contiguous United States which include latitude/longitude, date and time, magnitude, and depth of origination.',
        'FirstPara': 'There were a total of 24 datasets, each dataset containing data from one month for all months in 2020 and 2021. I started by pairing the months from both years into a singular dataset that represents all earthquakes of the given month for both years. I then began the data manipulation by cleaning the dataset from discarding unecessary information and/or NaN entries to changing datatypes of specific features to reduce memory usage. After that was done, I then used DBSCAN along with K-Nearest Neighbors from the Python library sklearn to find clusters in the dataset. I used K-Nearest Neighbors to tune for exceptional silhouette scores of clustering and DBSCAN for utilizing outliers in our dataset. I then made two distinct clustered datasets for each month with one containing the original epsilon value for DBSCAN (we\'ll call this Medium High) and another containing half the original epsilon value (we\'ll call this Very High). These seperated clustered datasets will help with determining if a location is in a high frequency hotspot or occasional frequency hotspot to give a correct warning to the user.',
        'SecondPara': 'The next task was to use a machine learning model to predict a cluster label of a users longitude and latitude of choice and give a warning based on results. For this I used an assortment of techniques to help seperate scaling and models for each unique month. First, I made a dictionary that holds the standard scalar fit function of the speciifc months data to help my machine learning model by adding some uniformality to the data. This will also be used to transform the longitude and latitude of the users input. Next, I made a dictionary for each clustered dataset of each month that holds the resulting model from executing GridSearch to tune hyperparameters for a Support Vector Classification model for that specific month. Each month held a model to predict clusters for both the Medium High and Very High datasets.',
        'FinalPara': 'With all of that said and done, I then implemented a Flask backend application that routes a POST request with longitude and latitude given as input parameters. Inside the POST request route, I took the current month and selected the respective scaling and modeling to predict a possible cluster label on both Medium High and Very High clustered datasets. If the Medium High model results in an outlier, there is not enough information or there is infrequent earthquakes in the area. If the Medium High model results in a cluster but the Very High model results in an outlier, there is a possibility that there will be an earthquake in that area during this time of year. Lastly, if the results of each model results in a valid cluster label, there is a strong possibility of and earthquake in the area during this time of year. Along with that, the Flask API also makes an image of the map using seaborns Kernel Density Estimation plot and Basemap to show the contourplot of the earthquake data of that month and the users current location.'
    }
}

module.exports = Desc;