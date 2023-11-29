const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

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
        const query = interaction.options.getString('track', true); // we need input/query to play

        // let's defer the interaction as things can take time to process
        await interaction.deferReply();
        
        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction // we can access this metadata object using queue.metadata later on
                }
            });

            return interaction.followUp(`Zazpívám vám **${track.title}**, ale ticho tady bude mrtkiii!!!`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp(`Posralo se něco, oprav si to debílku: ${e}`);
        }
    }
};
