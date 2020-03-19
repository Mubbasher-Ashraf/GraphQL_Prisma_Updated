function links(parent, args, conext) {
    return conext.prisma.user({ id: parent.id }).links();
}

module.exports = {
    links,
}