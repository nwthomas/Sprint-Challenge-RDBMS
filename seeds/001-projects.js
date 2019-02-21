exports.seed = function(knex, Promise) {
  return knex("projects")
    .truncate()
    .then(function() {
      return knex("projects").insert([
        {
          name: "Cut the grass",
          description: "Clean the yard by cutting the grass.",
          completed: false
        },
        {
          name: "Brush teeth",
          description: "Get ready for bed",
          completed: false
        }
      ]);
    });
};
