import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import VideoCard from "@/components/VideoCard";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "@/hooks/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import Trending from "@/components/Trending";
const videos = [
  {
    $id: "1",
    title: "Get inspired to code",
    thumbnail: "https://i.ibb.co/tJBcX20/Appwrite-video.png",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    prompt:
      "Create a motivating AI driven video aimed at inspiring coding enthusiasts with simple language",
    creator: {
      username: "John Doe",
      avatar: "https://i.pravatar.cc/46?img=1",
    },
  },
  {
    $id: "2",
    title: "How AI Shapes Coding Future",
    thumbnail: "https://i.ibb.co/Xkgk7DY/Video.png",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    prompt: "Picture the future of coding with AI. Show AR VR",
    creator: {
      username: "Jane Smith",
      avatar: "https://i.pravatar.cc/46?img=2",
    },
  },
  {
    $id: "3",
    title: "Dalmatian's journey through Italy",
    thumbnail: "https://i.ibb.co/CBYzyKh/Video-1.png",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    prompt:
      "Create a heartwarming video following the travels of dalmatian dog exploring beautiful Italy",
    creator: {
      username: "Alice Brown",
      avatar: "https://i.pravatar.cc/46?img=3",
    },
  },
  {
    $id: "4",
    title: "Meet small AI friends",
    thumbnail: "https://i.ibb.co/7XqVPVT/Photo-1677756119517.png",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    prompt:
      "Make a video about a small blue AI robot blinking its eyes and looking at the screen",
    creator: {
      username: "Charlie Green",
      avatar: "https://i.pravatar.cc/46?img=4",
    },
  },
  {
    $id: "5",
    title: "Find inspiration in Every Line",
    thumbnail: "https://i.ibb.co/mGfCYJY/Video-2.png",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    prompt:
      "A buy working on his laptop that sparks excitement for coding, emphasizing the endless possibilities and personal growth it offers",
    creator: {
      username: "Dave Wilson",
      avatar: "https://i.pravatar.cc/46?img=5",
    },
  },
  {
    $id: "6",
    title: "Japan's Blossoming temple",
    thumbnail: "https://i.ibb.co/3Y2Nk7q/Bucket-215.png",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    prompt: "Create a captivating video journey through Japan's Sakura Temple",
    creator: {
      username: "Eva White",
      avatar: "https://i.pravatar.cc/46?img=6",
    },
  },
  {
    $id: "7",
    title: "A Glimpse into Tomorrow's VR World",
    thumbnail: "https://i.ibb.co/C5wXXf9/Video-3.png",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    prompt: "An imaginative video envisioning the future of Virtual Reality",
    creator: {
      username: "Frank Black",
      avatar: "https://i.pravatar.cc/46?img=7",
    },
  },
  {
    $id: "8",
    title: "A World where Ideas Grow Big",
    thumbnail: "https://i.ibb.co/DzXRfyr/Bucket-59038.png",
    video: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    prompt:
      "Make a fun video about hackers and all the cool stuff they do with computers",
    creator: {
      username: "Grace Brown",
      avatar: "https://i.pravatar.cc/46?img=8",
    },
  },
];

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">Aora</Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={videos ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
