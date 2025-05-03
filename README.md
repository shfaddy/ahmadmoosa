# Tarabaiza; Music Production Tool

## Setup

```
setup [... directions]
```

### Sample Format

```
setup format <valid_value>
```

#### Example

```
setup format flac
```

### Sample Type

```
setup type <valid_value>
```

#### Example

```
setup type 24bit
```

### Sample Rate

```
setup rate <positive_number>
```

#### Example

```
setup rate 48000
```

### Sample Control Period

```
setup control <positive_integer>
```

#### Example

```
setup control 32
```

### Input and Output Channels

```
setup channels <positive_integer | predefined_value>
```

#### Example

```
setup channels 2
```

#### Predefined Values

##### Mono

```
setup channels mono
setup channels m
setup channels 1
```

##### Stereo

```
setup channels stereo
setup channels s
setup channels 2
```

##### Quadraphonic

```
setup channels quadraphonic
setup channels quad
setup channels q
setup channels 4
```

### Amplitude Reference

```
setup 0dbfs <number>
```

#### Example

```
setup 0dbfs 1
```

## Kit

## Roll

### Mark

```
roll mark <title> <position>
```

#### Example

```
roll mark maqsum 0
```

### Score

```
roll score [<delay>]
```
