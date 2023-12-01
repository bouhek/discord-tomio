const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
const { QueueRepeatMode } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('repeat')
        .addIntegerOption(option =>
            option
                .setName('mode')
                .setDescription('The repeat mode.')
                .setRequired(true)
                .addChoices(
                    { name: 'Queue', value: QueueRepeatMode.QUEUE },
                    { name: 'Track', value: QueueRepeatMode.TRACK },
                    { name: 'Off', value: QueueRepeatMode.OFF },
                    { name: 'Show', value: -1 },
                    { name: 'Autoplay', value: QueueRepeatMode.AUTOPLAY }
                )
        )
        .setDescription('Nekonečný žůžo labůžo!'),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        if (!queue) return interaction.followUp("Co mam asi tak loopovat ty debílku?");
        const requestedQueueRepeatMode = interaction.options.getInteger('mode');
        if (requestedQueueRepeatMode > 0) {
            queue.setRepeatMode(requestedQueueRepeatMode);
        }
        // Create response message with string representation of repeat mode
        let currentQueueRepeatModeString = "";
        switch (queue.repeatMode) {
            case QueueRepeatMode.OFF:
                currentQueueRepeatModeString = "off";
                break;
            case QueueRepeatMode.TRACK:
                currentQueueRepeatModeString = "track";
                break;
            case QueueRepeatMode.QUEUE:
                currentQueueRepeatModeString = "queue";
                break;
            case QueueRepeatMode.AUTOPLAY:
                currentQueueRepeatModeString = "autoplay";
                break;
            default:
                currentQueueRepeatModeString = "unknown";
                console.error(`Unknown repeat mode: ${queue.repeatMode}`);
                break;
        }
        return interaction.followUp(`nyni je loopovani nastaveno na: ${currentQueueRepeatModeString}`);
    }
};