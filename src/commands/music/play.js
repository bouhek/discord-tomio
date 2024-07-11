const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer, Player } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Uslyšíš zlaté české hlasivky.')
        .addStringOption(option =>
            option.setName('banger')
                .setDescription('Tak naval odkaz na ten banger!')
                .setRequired(true)),
    async execute(interaction) {
        const player = useMainPlayer();
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply('Pojd do voicu ty zmrde, ti ukazu!'); // make sure we have a voice channel
        const query = interaction.options.getString('banger', true); // we need input/query to play
        const searchResult = await player.search(query)
        // let's defer the interaction as things can take time to process
        await interaction.deferReply();
        
        try {
            const { track } = await player.play(channel, searchResult, {
                nodeOptions: {
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction, // we can access this metadata object using queue.metadata later on
                    volume: 100
                }
            });
            const songEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle(track.title)
                .setURL(track.url)
                .setAuthor({ name: 'Japonský samuraj', iconURL: 'https://1gr.cz/fotky/lidovky/17/111/c460/ANI321e56_lg_tomio1.JPG' })
                .setDescription('Tak tohle je neskutečnej banger!')
                .addFields({ name: 'Dýlka', value: track.duration })
                .setImage('https://c.tenor.com/Ex4Pl_uvQS4AAAAC/okamurapls-okamura.gif')
                .setTimestamp()
                .setFooter({ text: 'Koukej nabáhat do voicu si to poslechnout!' });
            return interaction.followUp({ embeds: [songEmbed] });
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Posralo se něco, oprav si to debílku: ${e}`);
        }
    }
};
