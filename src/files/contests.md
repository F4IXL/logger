# Contest JSON Definition

## name String

Name of the contest

```
{
    name: 'ARRL-FIELDDAY'
}
```

## settings Object

This allow customizing the contest settings and affect Cabrillo / ADIF export

### settings[key] Object

The key is the field to change (ex: sentExchange, timeCategory). You can update these settings:

- default String : Default value of the input
- override Array : Override set of options
- add Array : Add options to the default set
- exclude : Exclude the field from exported cabrillo
- hide : Hide the setting from the settings form

## entry Object

This object allow modifying the entry window and visible fields from the interface.

General options:

- label String : Label of the field
- allowSpace Boolean : Allow space in input and override default space behaviour
- hide : Hide the field from the interface
- default : Add default value (can be usefule if hidden field. Note that `sent` and `received` has a default value special behaviour)
- inputRegex String : letter wont print unless this regex is matched to input letter / digit
- regex String : form will not submit unless this regex is matched to input value
- size Number : override size of the form (-1 is spreading field)

### entry.custom

Let you add custom fields. Example:

```
comment: {
    label: 'Comment',
    allowSpace: true, // Allow use of space in this field
    size: -1
}
```

## rules Object

This object let you set the rules, points and multiplier to the contest.

// WIP

- dupe Boolean | String | Array : Allow dupe or add specific rules
- multipliers
- points
