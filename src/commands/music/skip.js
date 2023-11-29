const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip a song to next one'),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (queue.size < 1 && queue.repeatMode !== 3)
        return interaction.followUp("Nic dalšího už tu nemám.");

        queue.node.skip();

        return interaction.followUp("No dobře, ale jenom proto, že mám babičku z moravy.");
    }
};