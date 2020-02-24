# Redis Crash Course Tutorial

The code is this repository is based on the following videos:

- [Redis Crash Course Tutorial](https://www.youtube.com/watch?v=Hbt56gFj998)
- [Build A Node.js & Redis App From Scratch](https://www.youtube.com/watch?v=9S-mphgE5fA)

## Redis Commands

- `ping`
- `echo "hello world"`
- `set foo 100`
- `get foo`
- `incr foo`
- `decr foo`
- `exists foo`
- `flushall`
- `set bar "hello world"`
- `expire bar`
- `ttl bar`
- `del bar`
- `setex greeting 30 "hi there"`
- `persist greeting`
- `mset key1 "hi" key2 "world"`
- `append key1 " carlton"`
- `rename key1 key3`

### List

- `lpush people carlton`
- `lpush people tina`
- `rpush people sophie`
- `lrange people 0 -1`
- `lrange people 1 2`
- `lpop people`
- `rpop people`
- `linsert people before carlton jen`

### Set

- `sadd cars ford`
- `sadd cars honda`
- `sadd cars bmw`
- `smembers cars`
- `sismembers cars bmw`
- `scard cars`
- `smove cars mycars ford`
- `srem cars bmw`

### Sorted Set

- `zadd users 1966 carlton`
- `zadd users 1968 cheryl`
- `zadd users 1965 jeff`
- `zadd users 1965 kate`
- `zrank users carlton`
- `zrange users 0 -1`
- `zincrby users 5 kate`

### Hash

- `hset user:cj name "carlton joseph"`
- `hset user:cj email "carlton.joseph@gmail.com"`
- `hget user:cj email`
- `hgetall user:cj`
- `hmset user:jon name "jon doe" email "jon@gmail.com" age "25"`
- `hkeys user:cj`
- `hvals user:cj`
- `hincrby user:jon age 10`
- `hdel user:jon age`
- `hlen user:jon`

### Persistence

- `save`
