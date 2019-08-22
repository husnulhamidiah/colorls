# Colorls

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)


[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A Node.js app that colorizes the ls output with color and icons. Here are the screenshots of working example on an iTerm2 terminal (Mac OS), `oh-my-zsh` with `spacehip` theme and `powerline nerd-font + awesome-config` font with the `Ayu dark` color theme.

![image](https://user-images.githubusercontent.com/7609801/63525561-1d277680-c528-11e9-968e-83487525a4d9.png)

## Installation

1. Install Node.js (preferably, version > 4.0.0)

2. Install the patched fonts of powerline nerd-font and/or font-awesome. Have a look at the [Nerd Font README](https://github.com/ryanoasis/nerd-fonts/blob/master/readme.md) for more installation instructions.

    *Note for iTerm2 users - Please enable the Nerd Font at iTerm2 > Preferences > Profiles > Text > Non-ASCII font > Hack Regular Nerd Font Complete.*

3. Install the colorls app with `npm install -g @husnulanwari/colorls`

4. Start using colorls 🎉

5. Have a look at [Recommended configurations](#recommended-configurations) and [Custom configurations](#custom-configurations) .

## Recommended configurations

1. To add some short command (say, `lc`), add this to your shell configuration file (`~/.bashrc`, `~/.zshrc`, etc.) :

    ```
    alias lc='colorls'
    alias ll='colorls -- -lAst'
    ```

    You can find options usage in [custom configurations](#custom-configurations) section.

## Custom configurations

- With `--help` : Prints not so very helpful help menu (updated soon)

    ![image](https://user-images.githubusercontent.com/7609801/63525567-1ef13a00-c528-11e9-8d82-87fb593a117d.png)

- With `--sort` (default): Sort output to show directory first. Use `--no-sort` to show `ls` output as usual :

    ![image](https://user-images.githubusercontent.com/7609801/63525575-21ec2a80-c528-11e9-974e-844956e8d0f1.png)

- With `ls` flags. You can use `ls` flags, just put it after `--`, something like `ls --sort -- -lAst . ./pictures`

    ![image](https://user-images.githubusercontent.com/7609801/63525595-29133880-c528-11e9-9099-27f468dbdcda.png)

- With `--dir-color`, `--file-color`, `--meta-color` and `--error-color` : Change default color

    ![image](https://user-images.githubusercontent.com/7609801/63525610-2c0e2900-c528-11e9-8b32-45483e02fbf3.png)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)