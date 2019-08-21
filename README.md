# Colorls

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)


[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A Node.js app that colorizes the ls output with color and icons. Here are the screenshots of working example on an iTerm2 terminal (Mac OS), `oh-my-zsh` with `spacehip` theme and `powerline nerd-font + awesome-config` font with the `Ayu dark` color theme.

![image](https://user-images.githubusercontent.com/7609801/63421229-6b5a4e00-c432-11e9-8779-2b09bb4cfef9.png)

## Installation

1. Install Node.js (preferably, version > 4.0.0)

2. Install the patched fonts of powerline nerd-font and/or font-awesome. Have a look at the [Nerd Font README](https://github.com/ryanoasis/nerd-fonts/blob/master/readme.md) for more installation instructions.

    *Note for iTerm2 users - Please enable the Nerd Font at iTerm2 > Preferences > Profiles > Text > Non-ASCII font > Hack Regular Nerd Font Complete.*

3. Install the colorls app with `npm install -g @husnulanwari/colorls`

4. Start using colorls 🎉

5. Have a look at Recommended configurations and Custom configurations.

## Recommended configurations

1. To add some short command (say, `lc`), add this to your shell configuration file (`~/.bashrc`, `~/.zshrc`, etc.) :

    ```
    alias lc='colorls'
    alias ll='colorls -- -lAst'
    ```

    You can find options usage in [custom configurations](#custom-configurations) section.

## Custom configurations

- With `--help` : Prints not so very helpful help menu (updated soon)

    ![image](https://user-images.githubusercontent.com/7609801/63420976-fbe45e80-c431-11e9-86a7-bdfb69e3bb2f.png)

- With `--sort` (default): Sort output to show directory first. Use `--no-sort` to show `ls` output as is :

    ![image](https://user-images.githubusercontent.com/7609801/63421778-61851a80-c433-11e9-919d-e721c83d70b6.png)

- With `ls` flags. You can use `ls` flags, just put it after `--`, something like `ls --sort -- -lAst . ./pictures`

    ![image](https://user-images.githubusercontent.com/7609801/63422381-72825b80-c434-11e9-8d6f-8c6505bc7e5b.png)

- With `--dir-color`, `--file-color`, `--meta-color` and `--error-color` : Change default color

    ![image](https://user-images.githubusercontent.com/7609801/63423430-7f07b380-c436-11e9-8309-0671bee0db18.png)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)