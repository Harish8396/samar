#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Specify instructions using this variable
# Need to manually add a new line
NEWLINE = "<br/>"
WELCOME = "Welcome to the experiment. Press any key to begin."
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
PRACTICE = "Welcome to practice session."
CONT = ""
START = ""
STOP = ""
READY = "Real experiment is going to start."
END = "Experiment has ended."
NO_OF_LISTS = 4
BREAK = 2
BREAK_INTVL = 20
BREAK_START = "This break is for " + str(BREAK_INTVL) + " seconds."
BREAK_END = "This break has ended."
STYLE = 'style="font-size: 18px;"'