# samar
SETUP
For setting up the application you require Django 1.10.8  and any python version that supports this Django version. 
For setting up Django on your PC visit the following link.
Once Django has been setup, then, follow the steps to launch the application
        Unzip the folder that has been given.
        Rename the unzipped folder to “website”.
        Open the command line.
        Navigate into the directory “website”.
        Start the server using “python manage.py runserver”.
        The application will run on “localhost:8000/samar”

PREFERENCES
The basic workflow of the trial would be as follows.
        Initial Instruction
        Message indicating start of Practice Trial.
        Practice Trial
        Message indicating start of Main Trial.
        Main Trial
        Message indicating end of experiment.
There is a file called preferences.py in the project that helps you to configure the text that appears in each part of the trial.

WELCOME : Welcome message for the experiment. Addition of NEWLINE anywhere gets a newline in the text.
INSTRUCTS : Array for giving instructions to the user. Each element in the array will appear on a newpage. You can add as many elements as you want
PRACTICE : Welcome message for the practice session.
CONT, START, STOP. Are for the recording instructions. 
READY : Ready message before start of real experiment.
END : Message for end of experiment.
NO_OF_LISTS : For the number of input files that you are going to have.

FEATURES
The application is for running linguistics trials based on priming. The user looks at questions and records his responses to them which are in turn stored in the server.
          
          Now, the questions for the trial come from a set of files which are present prior to the start of the experiment.
          These item files are named “1item.dms”, “2item.dms”, “3item.dms”....... “Xitem.dms” in the “website/samar/input”.
          Based on the participant id in the trials, only one item file is given to a single user and that too in a round robin fashion.
          So it is the examiner’s responsibility to have these files ready and specify the number of files present in preferences.py(NO_OF_FILES field).
          The user responses from the trial are in the “website/samar/output” folder. 
          You can also put in breaks in the middle of the main test. There are two fields called BREAK and BREAK_INTVL in preferences.py. The experiment will take a break after BREAK trials in the real experiment for BREAK_INTVL seconds
          There is also a facility for changing the font size using the STYLE option in preferences.py. Just change the number in the font-size: 18px and your font size will change
