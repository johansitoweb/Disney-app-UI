import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card, IconButton } from 'react-native-paper';

const movies = [
  { title: 'Película 1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxuob8FSZjqaKzWPKMCS6JviI-aJITlEA5qw&s', description: 'Descripción de Película 1' },
  { title: 'Película 2', image: 'https://www.ecartelera.com/carteles/13600/13600/002_p.jpg', description: 'Descripción de Película 2' },
  { title: 'Película 3', image: 'https://hips.hearstapps.com/hmg-prod/images/navidad-de-golpe-1668429866.jpg', description: 'Descripción de Película 3' },
  { title: 'Película 4', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9yEB8AG6gerXxPtH6pQi9JR50kFTW4adABA&s', description: 'Descripción de Película 4' },
  { title: 'Película 5', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbwEMqvlrN0xAHJYFhkSSLrIeGbmuzVukRPw&s', description: 'Descripción de Película 5' },
  { title: 'Película 6', image: 'https://es.web.img3.acsta.net/pictures/19/09/03/17/01/2834543.jpg', description: 'Descripción de Película 6' },
];

export default function App() {
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [viewFavorites, setViewFavorites] = useState(false);

  const toggleFavorite = (movie) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(movie)
        ? prevFavorites.filter((fav) => fav !== movie)
        : [...prevFavorites, movie]
    );
  };

  const showDescription = (movie) => {
    setSelectedMovie(movie);
  };

  const displayedMovies = viewFavorites ? favorites : movies;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Disney+</Text>
          <TouchableOpacity onPress={() => setViewFavorites(!viewFavorites)}>
            <Text style={styles.favoritesText}>{viewFavorites ? 'Ver Todas' : 'Ver Favoritas'}</Text>
          </TouchableOpacity>
        </View>
        {selectedMovie ? (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>{selectedMovie.title}</Text>
            <Text style={styles.descriptionText}>{selectedMovie.description}</Text>
            <Image source={{ uri: selectedMovie.image }} style={styles.descriptionImage} />
          </View>
        ) : (
          <View style={styles.moviesContainer}>
            {displayedMovies.map((movie, index) => (
              <Card key={index} style={styles.card}>
                <Image source={{ uri: movie.image }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} onPress={() => showDescription(movie)}>{movie.title}</Text>
                  <IconButton
                    icon={favorites.includes(movie) ? 'heart' : 'heart-outline'}
                    color={favorites.includes(movie) ? 'red' : 'white'}
                    size={20}
                    onPress={() => toggleFavorite(movie)}
                  />
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  favoritesText: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 10,
  },
  moviesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    backgroundColor: '#333333',
    marginBottom: 20,
    width: '45%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  descriptionContainer: {
    alignItems: 'center',
    padding: 20,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
  },
  descriptionImage: {
    width: 200,
    height: 300,
  },
});
