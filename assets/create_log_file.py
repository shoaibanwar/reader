#!/usr/bin/python


#end = 11000000
end = 220000
fo = open("log_file.txt", "w")

print "Generating the log file will take a while. Please wait..."

for x in range(1, end):
    fo.write("S/N %s --- !@@##$$%% This is going to be a JUNK Log String \
by the NUMBER --->>> %s \n" % (x, x))

print "Log file has been created by the name of log_file.txt"
print "It should be located where this script is executed from."
fo.close()
