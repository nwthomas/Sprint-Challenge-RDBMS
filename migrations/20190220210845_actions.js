exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", tbl => {
    tbl.increments("id");
    tbl.string("name", 128);
    tbl.string("description", 255);
    tbl.string("notes", 255);
    tbl.boolean("completed");
    tbl.timestamps(true, true);
    tbl.unique("name", "uq_actions_name");
    tbl
      .integer("project_id")
      .unsigned()
      .references()
      .inTable("projects");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
