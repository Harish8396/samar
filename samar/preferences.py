#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Control flow
# Welcome Screen --> Instruction pages --> Practice Screen --> Practice Session
# --> Ready Page --> Real Experiment --> End of Experiment

# Break is the new line equivalent in html
NEWLINE = "<br/>"

# Displayed on the welcome screen
WELCOME = "Welcome to the experiment. Press any key to begin."

# This is an array of html strings. Each html string is displayed on a separate page.
INSTRUCTS = ["नमस्कार।" + NEWLINE + 
    "इस परीक्षण में भाग लेने के लिए धन्यवाद।" + NEWLINE + 
    "इस परीक्षण में आपको कुछ वाक्य पढ़ने हैं।" + NEWLINE + 
    "आपको पहले एक + का चिन्ह दिखेगा। जब आप स्पेस-बार दबाएंगे, तो इस चिन्ह के ठीक बगल में आपको वाक्य का पहला शब्द (या एक प्रश्न) दिखेगा।" + NEWLINE + 
    "दोबारा स्पेस-बार दबाने पर आपको दूसरा शब्द दिखेगा, साथ ही पहला शब्द चला जाएगा।" + NEWLINE + 
    "इसी तरह, पूरे वाक्य को पढ़ा जा सकता है।",
    "आपका यह प्रयास होना चाहिए कि आप प्राकृतिक रूप से पढ़ें, ताकी आपको वाक्य पूरी तरह समझ में आए।" + NEWLINE + 
    "कुछ वाक्यों के आखरी शब्द पढ़ने के बाद स्पेस-बार दबाने पर आपको एक प्रश्न दिखेगा।" + NEWLINE + 
    "जो वाक्य आपने अभी खतम किया है, यह प्रश्न उसी वाक्य से संबंधित होगा।" + NEWLINE + 
    "अगर सवाल का जवाब हाँ है तो \"F\" बटन दबाएं, और अगर जवाब ना है तो \"J\" बटन दबाएं। आपको इन बटनों के बारे में फिर से याद दिलाया जाएगा।" + NEWLINE + 
    "प्रश्नों का उत्तर जल्द से जल्द देने की कोशिश करें, साथ ही, सही उत्तर देने की भी कोशिश करें।"]

# Displayed at the start of pratice session.
PRACTICE = "Welcome to practice session."
CONT = ""
START = ""
STOP = ""

# Displayed at the start of the actual experiment.
READY = "Real experiment is going to start."

# Displayed when the experiment has ended.
END = "Experiment has ended."

# Specify the number of items using this variable.
NO_OF_LISTS = 4

# Number of trials after which break starts.
BREAK = 2

# Number of seconds the break lasts.
BREAK_INTVL = 20

# Message displayed during the break.
BREAK_START = "This break is for " + str(BREAK_INTVL) + " seconds."

# Message displayed after the break ends.
BREAK_END = "This break has ended."

# You can now style the text using this string. Font size is shown as an example.
STYLE = 'style="font-size: 18px;"'