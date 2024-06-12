# LibreScript
Open source screenwriting software (Pull requests are welcome!).

![imagen](https://github.com/Kuvrot/LibreScript/assets/23508114/128d9342-d9f1-48ad-8025-28f96a4788e7)

## ScriptDown
LibreScript uses a markup language called ScriptDown and has the following commands:
- `title:` for writing the Title of the story
- `subtitle: ` for writing subtitles in the cover
- `<<<` to manually make a page-break
- `#` to write the scene header
- `=` can be used for action, scene header, plane or description
- `--` to write the character name
- `_` to write the dialogue of the character
- `{` and `}` for parenthesis direction
- `&` for transitions

![imagen](https://github.com/Kuvrot/LibreScript/assets/23508114/0683b712-8458-4338-8b82-e7ec8fd01def)


Example of scriptdown:
```r
# 1. room - ext. - day.
= A character comes into the room and proceeds to talk
-- CHARACTER
_ I am a character, and this is my dialogue.
```

![imagen](https://github.com/Kuvrot/LibreScript/assets/23508114/eda65dcd-13af-4aac-b0c9-53e6f0fd1d8e)



This is a code to make a simple cover:
```r
title: Story title
subtitle: Author name
<<<		
```

And when the script is exported to PDF it would look like this:

![imagen](https://github.com/Kuvrot/LibreScript/assets/23508114/028ee66f-c0ed-4c57-bea7-26d5fa8b700c)



