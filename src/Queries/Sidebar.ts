const SidebarQueries = {
    All: () => ['sidebar'],
    Menu: () => [...SidebarQueries.All(), 'Menu']
}

export default SidebarQueries;