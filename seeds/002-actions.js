exports.seed = function(knex, Promise) {
  return knex("actions")
    .truncate()
    .then(function() {
      return knex("actions").insert([
        {
          name: "Put toothpaste on toothbrush",
          description: "stuff here",
          notes: "more stuff",
          completed: false,
          project_id: 2
        },
        {
          name: "Brush teeth with toothbrush for at least 3 minutes",
          description: "asdfrasdfasdfasdf",
          notes: "asdfasdfasdfasdf",
          completed: false,
          project_id: 2
        }
      ]);
    });
};
