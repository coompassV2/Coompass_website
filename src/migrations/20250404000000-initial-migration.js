
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      signature: {
        type: Sequelize.STRING,
        allowNull: true
      },
      key: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mobilePhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true
      },
      companies: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      lastLogin: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Companies table
    await queryInterface.createTable('companies', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      creator: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      employees: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sdg: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    // Missions table
    await queryInterface.createTable('missions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reward: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      creator: {
        type: Sequelize.STRING,
        allowNull: false
      },
      participants: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      causes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      finishedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      when_start: {
        type: Sequelize.DATE,
        allowNull: true
      },
      when_finish: {
        type: Sequelize.DATE,
        allowNull: true
      },
      pointOfContact: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });

    // Create the rest of the tables
    await queryInterface.createTable('assistant_threads', {
      threadId: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('calendars', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      entryType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      missionId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'missions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.createTable('certificates', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      createdDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      collaborators: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hoursProvided: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      initiatives: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      causes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      txHash: {
        type: Sequelize.STRING,
        allowNull: true
      },
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('districts', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      pt: {
        type: Sequelize.STRING,
        allowNull: false
      },
      en: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await queryInterface.createTable('company_districts', {
      company_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      district_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'districts',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.createTable('features', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });

    await queryInterface.createTable('mission_logs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      missionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'missions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('hour_logs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      participantId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      missionLogId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'mission_logs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('mission_participants', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      missionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'missions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('partnerships', {
      companyId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      partnerOrgId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.createTable('permissions', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isModerator: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });

    await queryInterface.createTable('reset_accounts', {
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'email'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      confirmationKey: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('sendgrid_logs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      event: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('user_companies', {
      userId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      companyId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'companies',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });

    await queryInterface.createTable('user_logs', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      missionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'missions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      action: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('users_features', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      featureId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'features',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });

    await queryInterface.createTable('zoho_tokens', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expires: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop tables in reverse order to respect foreign keys
    await queryInterface.dropTable('zoho_tokens');
    await queryInterface.dropTable('users_features');
    await queryInterface.dropTable('user_logs');
    await queryInterface.dropTable('user_companies');
    await queryInterface.dropTable('sendgrid_logs');
    await queryInterface.dropTable('reset_accounts');
    await queryInterface.dropTable('permissions');
    await queryInterface.dropTable('partnerships');
    await queryInterface.dropTable('mission_participants');
    await queryInterface.dropTable('hour_logs');
    await queryInterface.dropTable('mission_logs');
    await queryInterface.dropTable('company_districts');
    await queryInterface.dropTable('certificates');
    await queryInterface.dropTable('calendars');
    await queryInterface.dropTable('assistant_threads');
    await queryInterface.dropTable('missions');
    await queryInterface.dropTable('features');
    await queryInterface.dropTable('districts');
    await queryInterface.dropTable('companies');
    await queryInterface.dropTable('users');
  }
};
