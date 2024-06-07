# LibreScript
Open source screenwriting software (Pull requests are welcome!).

![imagen](https://github.com/Kuvrot/LibreScript/assets/23508114/128d9342-d9f1-48ad-8025-28f96a4788e7)

## ScriptDown
LibreScript uses a Markdown-like language called ScriptDown and has the following commands:
- `title:` for writing the Title of the story
- `subtitle: ` for writing subtitles in the cover
- `<<<` to manually make a pagebreak
- `#` to write the number and title of the screen
- `=` can be used for action, scene header, plane or description
- `-` to write the character name
- `_` to write the dialogue of the character
- `{` and `}` for parenthesis direction
- `&` for transitions

![imagen](https://github.com/Kuvrot/LibreScript/assets/23508114/d25b7fd3-25dd-44b0-97b3-bd69c14b0bf3)

The following example was made with the following text in ScriptDown
```r
# 1. SCENE 1
= A character comes into the room and proceeds to talk
- CHARACTER
_ I am a character, and this is my dialogue.
```

This is a code to make a simple cover:
```r
title: Story title
subtitle: Author name
<<<		
```

And when the script is exported to PDF it would look like this:

![imagen](https://github.com/Kuvrot/LibreScript/assets/23508114/028ee66f-c0ed-4c57-bea7-26d5fa8b700c)

![imagen](https://github.com/Kuvrot/LibreScript/assets/23508114/90d6fd75-84f6-4db5-be23-98280bcbc7ba)



