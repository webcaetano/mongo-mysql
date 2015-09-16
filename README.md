### Mongo Mysql Test Performance in Nodejs

#### Installation

```
git clone https://github.com/webcaetano/mongo-mysql.git
cd mongo-mysql
npm install
node index
```

Comparison tests made by this repo 

With data size in rows numbers : 

10 rows
```
mysql insert: 1702ms
mysql select: 11ms

mongo insert: 47ms
mongo select: 12ms
```

100 rows
```
mysql insert: 8171ms
mysql select: 10ms

mongo insert: 167ms
mongo select: 60ms
```


1000 rows
```
mysql insert: 94813ms (1.58 minutes)
mysql select: 13ms

mongo insert: 1013ms
mongo select: 677ms
```


10.000 rows
```
mysql insert: 924695ms (15.41 minutes)
mysql select: 144ms

mongo insert: 9956ms (9.95 seconds)
mongo select: 4539ms (4.539 seconds)
```
