---
id: version-2.4.0-steps-generators
title: Generators
original_id: steps-generators
---

# Steps used to generate values:

## `I generate random ":generator:param:param" as ":variableName"`
 

Allows to generate a random value using the generator specified by `:generator:param:param`.

The generator must be defined inside the any of the `generators` directories specified in `kakunin.conf.js` file `default: generators`.

If the generator exists, then the value will be saved under the `:variableName` and can be accessed by:

* steps using variable store

* by calling `variableStore.getVariableValue(:variableName)`

* by using variable store transformer on supported steps `v:variableName`

---
