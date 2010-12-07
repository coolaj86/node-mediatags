
Can't parse the `$`, but interprets as variable instead:

    08 If I Had $1000000.m4a

Solution: change String.quote() (remedial) to accept arbitrary quote characters, such as '
