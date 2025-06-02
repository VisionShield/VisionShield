import FileCard from '../components/FileCard';

const files = [
    { id: '1', title: 'SGM Contract', date: 'Nov 22, 2020', type: 'pdf' },
    { id: '2', title: 'JIP Contract', date: 'Nov 22, 2020', type: 'pdf' },
];

export default function HomeScreen() {
    // ...previous code
    return (
        <SafeAreaView style={styles.container}>
            {/* ...users list */}
            <Text style={styles.title}>Mes fichiers partagés récemment :</Text>
            <FlatList
                horizontal
                data={files}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <FileCard title={item.title} date={item.date} type={item.type} />
                )}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}
