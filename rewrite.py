import csv
with open('kody.csv', "rt", encoding='utf-8') as f:
	reader = csv.reader(f)
	next(reader)
	js = "{\n"
	#next(reader)
	for row in reader:
		#line = next(reader)
		print(row)
		line = row[0].split(';')
		print(line)
		js += "\t"+'"'+line[0] + '": "' + line[2]+ '",\n'
		#	print(row)
	js = js[:-2]
	js +="\n}"
ff = open("kody.json","w")
ff.write(js)
ff.close()