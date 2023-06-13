# Usage:
# make        # compile all binary
# make clean  # remove ALL binary and objects

.phony: all clean

CC = gcc 

LINKERFLAG = -lm

SRCS := $(wildcard *.c)  # fuction for filenames: all files ending in .c will be stored in SRCS
BINS := $(SRCS:%.c=%)  # subsitution reference: files stored in SRCS ending in .c will be stored without .c

all: ${BINS}  # calls values in BINS as individual targets

%: %.o  # % matches to any values
	@echo "Checking.."
	${CC} ${LINKERFLAG} $< -o $@  # $< matches to prerequisites and $@ matches to targets
# if % matches to foo, this is the same as
# foo: foo.o
#     @echo "Checking.."
#     gcc -lm foo.o -o foo
# this rule will be called for every value in ${BINS}

%.o: %.c  # every prerequisites from previous rule is considered a target for this rule
	@echo "Creating object.."
	${CC} -c $< 

clean:
	@echo "Cleaning up.."
	rm -rvf *.o ${BINS}
