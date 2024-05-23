const faker = require('faker');
const fs = require('fs');

const generateData = () => {
  const data = {
    users: [],
    posts: [],
    // Add more entities as needed
  };

  // Generate random users
  for (let i = 0; i < 10; i++) {
    data.users.push({
      id: i + 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
    });
  }

  // Generate random posts
  for (let i = 0; i < 20; i++) {
    data.posts.push({
      id: i + 1,
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      userId: faker.random.number({ min: 1, max: 10 }),
    });
  }

  return data;
};

const data = generateData();
fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
console.log('Random data generated and written to db.json');
