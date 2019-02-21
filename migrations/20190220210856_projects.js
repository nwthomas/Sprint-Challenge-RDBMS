exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", tbl => {
    tbl.increments("id");
    tbl.string("name", 128);
    tbl.string("description", 255);
    tbl.boolean("completed");
    tbl.timestamps(true, true);
    tbl.unique("name", "uq_projects_name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
