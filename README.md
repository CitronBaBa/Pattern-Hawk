# Pattern-Hawk
Identify digit patterns in a given string

This project creates a standalone syntax to describe different digit patterns.  
Any given string can be checked against these pattern expressions for comformity.

## Pattern Syntax
 
letter A-G are used to represents unique digit positions in a given string, X represents wildcard

* ABB => 011, 100, 122 ..
A has 10 possible values, and B has 9 possible values for each given A, making it 90 possibilities in total.

* XAA => 011, 100, 122 ..
X has 10 possible values, and A has 10 possible values uninfluenced by X, making it 100 possibilities in total.

trailing [key:val;key:val;key:val...] in a pattern specifies other constraints that will be enforced on this pattern 

base: radix of the digits when calculating numeric value, defaults to decimal
digitSet: the set of chars used to represent the digit number, can be Chinese, Japanese etc. Defaults to 0-9.
min: minimum numeric value of the variable digits
max: maximum numeric value of the variable digits
isSequential: digits should be in an sequential ascending order when set to true
_CUSTOM_${string}: other specific rules to be applied


## Grouping Syntax
  Group sub-patterns to form new and more complex ones.  

 * (pattern1)(pattern2) => matches pattern1 and then pattern2
 * (pattern1)|(pattern2) => matches pattern1 or pattern2
 * (pattern1)(pattern2) | (pattern3)(pattern4) => matches pattern1 and then pattern2, or matches pattern3 and then pattern4
 * ((pattern1) | (pattern2)) (pattern3) => not supported yet
