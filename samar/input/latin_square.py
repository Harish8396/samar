#Creates a latin square design given number of conditions and items.

import sys
import codecs


#Change this according to your experiment
conditions = 4
#Change this according to your experiment

# items = 21
items = 24			#Changed here
list_hash = {}

latin = []
latin.append("NULL")

t = 1
while t < items+1:
	latin.append(t)
	t = t + 1


i = 1			# items 	 => number of questions
x = 1			# conditions => number of options

while x < conditions+1:
	#For each option
	j = x					# j => this option
	i = 1
	while i < items+1:
		#For each question
		if(j == conditions+1):
			j = 1
		
		#Change this according to your experiment	
		if(j == 1):
			alph = "a"
		elif(j == 2):
			alph = "b"
		elif(j == 3):
			alph = "c"
		elif(j == 4):
			alph = "d"
	
		latin[i] = str(latin[i]) + "\t" + str(alph)
		key = str(i) + ":" + str(alph)
		list_hash[key] = x 
		print str(key) + "\t" + str(x)

		j = j + 1
		i = i + 1
	x = x + 1

t = 1
while t < items+1:
	print latin[t]
	t = t + 1

x = 1
while x < conditions+1:
	#Change this according to your experiment
#	file_name = "temp-dir/" + str(x) + "item"
	file_name = str(x) + "item"
	fo = codecs.open(file_name, 'w', "utf-8")

	#Item file
	f = codecs.open(sys.argv[1], 'r', "utf-8")
	lines = f.readlines()
	count = 1

	for line in lines:		
		if ( count % 7 == 1 or count % 7 == 2 or count % 7 == 3):
			if(line[0] == "#"):
				if count != 2 :
					fo.write("\n\n")
			fo.write(line)

		else:
			if (count > 3 and count < 65) :
				key = line[0] + ":" + line[1]
			else :
				if (count > 171 and count < 233) :
					key = line[0] + ":" + line[1]
				else :
					if (count > 339 and count < 401) :
						key = line[0] + ":" + line[1]
					else :
						if (count > 507 and count < 569) :
							key = line[0] + ":" + line[1]
						else :
							key = line[0] + line[1] + ":" + line[2]

			#print key		// Print to cross check 

			if (key in list_hash and x == list_hash[key]):
				#print line 		// Print to cross check
				fo.write(line)
			
		count = count + 1

	x = x + 1
