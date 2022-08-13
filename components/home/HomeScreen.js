import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Fuse from "fuse.js";

import Custom_Header from "../shared/Header/Custom_Header";
import Custom_Text from "../shared/Text/Custom_Text";
import Custom_TextInput from "../shared/TextInput/Custom_TextInput";
import SearchButton from "../shared/SearchButton/SearchButton";
import { getGitPublicRepositories } from "../../utils";
import { Layout, Fonts } from "../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  body: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 24,
  },
  headerTitleStyle: {
    color: "#fff",
  },
  usernameInputStyle: {
    marginVertical: 12,
  },
  usernameInputContainer: {
    marginTop: 6,
  },
  searchInputStyle: {
    marginBottom: 12,
  },
  searchInputRow: {
    marginTop: 6,
    flexDirection: "row",
  },
  searchTextInputContainer: {
    flex: 8.5,
  },
  searchIconContainer: {
    flex: 1.5,
    marginLeft: 4,
  },
  searchInputError: {
    marginTop: 4,
  },
  publicRepoStyle: {
    height: (Layout.screenHeight * 3) / 5,
  },
  rowContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
  },
  listHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

const Row = ({ repo }) => {
  const onPress = () => {
    WebBrowser.openBrowserAsync(repo.html_url);
  };

  return (
    <View style={styles.rowContainer}>
      <View style={styles.rowLeft}>
        <Entypo name="dot-single" size={24} color="#232323" />
        <Custom_Text value={repo.name} />
      </View>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="open" size={24} color="#0080FF" />
      </TouchableOpacity>
    </View>
  );
};

function HomeScreen({}) {
  const [username, setUsername] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gitReposData, setGitReposData] = useState([]);
  const [searchResut, setSearchResult] = useState([]);

  useEffect(() => {
    if (username === "") {
      setGitReposData([]);
      setSearchResult([]);
    }
    if (username === "" && searchKey) {
      setErrorMessage("Username cannot be empty.");
    }
    if (username && searchKey) {
      setErrorMessage("");
    }
    if (username && searchKey === "") {
      setSearchResult(gitReposData);
      setErrorMessage("");
    }
  }, [searchKey, username]);

  const handleChangeUsername = (text) => {
    setUsername(text);
  };

  const handleEndEditingUsername = async () => {
    if (username !== "") {
      const data = await getGitPublicRepositories(username);
      if (data[0]?.error) {
        await setGitReposData([]);
        await setSearchResult([]);
        setErrorMessage(`Error: ${data[0]?.error?.message}`);
      } else {
        await setGitReposData(data);
        await setSearchResult(data);
      }
    }
  };

  const handleChangeSearchKey = (text) => {
    setSearchKey(text);
  };

  const handlePressSearchKey = () => {
    const fuseResult = fuseSearch(searchKey);
    if (fuseResult && fuseResult.length > 0) {
      setSearchResult(fuseResult.map((x) => x.item));
    }
  };

  const renderItem = ({ item }) => <Row repo={item} />;

  const fuseSearch = (pattern) => {
    const options = {
      includeScore: true,
      minMatchCharLength: 1,
      threshold: 0.2,
      shouldSort: true,
      findAllMatches: true,
      location: 0,
      distance: 30,
      keys: ["name", "language"],
    };
    const fuse = new Fuse(gitReposData ? gitReposData : [], options);
    const result = fuse.search(pattern);
    return result;
  };
  return (
    <View style={styles.container}>
      <Custom_Header
        centerComponent={
          <View>
            <Custom_Text
              type="header"
              value="Home"
              isBold
              style={styles.headerTitleStyle}
            />
          </View>
        }
      />
      <View style={styles.body}>
        <View style={styles.usernameInputStyle}>
          <Custom_Text value="Username" isBold />
          <View style={styles.usernameInputContainer}>
            <Custom_TextInput
              placeholder="Enter username"
              value={username}
              onChangeText={handleChangeUsername}
              onEndEditing={handleEndEditingUsername}
              style={{ borderColor: errorMessage ? "#ff3333" : "#262626" }}
            />
          </View>
        </View>
        <View style={styles.searchInputStyle}>
          <Custom_Text value="Search" isBold />
          <View style={styles.searchInputRow}>
            <View style={styles.searchTextInputContainer}>
              <Custom_TextInput
                placeholder="Enter key words"
                value={searchKey}
                onChangeText={handleChangeSearchKey}
                style={{ borderColor: errorMessage ? "#ff3333" : "#262626" }}
              />
            </View>
            <View style={styles.searchIconContainer}>
              <SearchButton
                onPress={handlePressSearchKey}
                disabled={errorMessage}
              />
            </View>
          </View>
          {errorMessage && (
            <View style={styles.searchInputError}>
              <Custom_Text value={errorMessage} style={{ color: "#ff3333" }} />
            </View>
          )}
        </View>
        <View style={styles.publicRepoStyle}>
          <Custom_Text value="Public Repositories" isBold />
          <FlatList
            ListHeaderComponent={
              <View style={styles.listHeaderStyle}>
                <Custom_Text
                  value="Repository name"
                  style={{ fontSize: Fonts.size.small }}
                />
                <Custom_Text
                  value="Go to GitHub"
                  style={{ fontSize: Fonts.size.small }}
                />
              </View>
            }
            data={searchResut}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;
