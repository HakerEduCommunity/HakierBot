![HakierBot](https://raw.githubusercontent.com/HakerEduCommunity/design-assets/master/assets/github-thumbnail.png)
# Hakier Bot [![Discord](https://discordapp.com/api/guilds/302874462313906179/embed.png)](https://discord.gg/8rtAfsV)
Discord bot for HakerEduPL discord server.
##### [To test our bot, join HakerEduPL Discord server! ](https://discord.gg/8rtAfsV)
Or... if u want to test our dev builds, just [click](https://discord.gg/c6PqMP7)

## :rocket: Setting up
0. Clone this repository
```bash
git clone https://github.com/HakerEduCommunity/HakierBot
```
1. Install dependencies
```bash
npm install
```
2. Navigate to the cloned directory
```bash
cd HakierBot/
```
3. Config
```bash
cp config/example_config.json config/config.json
```
Then open `config/config.json` in your text editor (like nano, vim, vs code, etc) and put your Discord bot token in the `token` field.

3. :rocket: Start bot (without auto reload)
```bash
node src/index.js
```
4. :construction: or start bot in development mode (auto reload)
```bash
npm start
```

Made with :heart: by HakerEdu Community
