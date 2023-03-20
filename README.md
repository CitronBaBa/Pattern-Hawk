# Pattern-Hawk
**This project aims to identify digit patterns in a given string.**   
     
**It creates a standalone syntax to precisely describe these different digit patterns, which can then be used to check any input string for conformity.**


## How to run it
You will need a node version of 16 or above.

* set up.  
`git clone ...`    
`npm install`

* run all the test cases.  
`npm run test`

* run a command line to directly interact with it.  
`npm run start`  

---------

## Pattern Syntax
A typical expression that defines a pattern: ABB[base:hex;charset:hex], it consits both symbols (ABB) and attributes ([base:hex;charset:hex]).

### Symbols
Letter A-G are used to represents unique digit positions in a given string, while X represents wildcard,  
other characters are interpreted as static and will be matched directly

* ABB => 011, 100, 122 ..
A has 10 possible values, and B has 9 possible values for each given A, making it 90 possibilities in total.

* XAA => 011, 100, 122 ..
X has 10 possible values, and A has 10 possible values uninfluenced by X, making it 100 possibilities in total.


### Attributes
trailing [key:val;key:val;key:val...] in a pattern specifies other constraints that will be enforced on this pattern   

key | value |
| ----------- | ----------- |
base | radix of the digits, used for calculating numeric value, defaults to decimal.    
digitSet | the set of chars used to represent the digit number, can be Chinese, Japanese etc. Defaults to 0-9.      
min | minimum numeric value of the variable digits.   
max | maximum numeric value of the variable digits.   
isSequential | digits should be in an sequential ascending order when set to true.     
_CUSTOM_${string} | other specific rules to be applied.    


## Grouping Syntax
  Group sub-patterns to form new and more complex ones.    
  For now only shallow groupings are supported and 'or' relationship takes precedent.   

 * (pattern1)(pattern2) => matches pattern1 and then pattern2
 * (pattern1)|(pattern2) => matches pattern1 or pattern2
 * (pattern1)(pattern2) | (pattern3)(pattern4) => matches pattern1 and then pattern2, or matches pattern3 and then pattern4
 * ((pattern1) | (pattern2)) (pattern3) => not supported yet
