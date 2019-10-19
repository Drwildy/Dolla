﻿// <auto-generated />
using System;
using DollaWeb.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DollaWeb.Migrations
{
    [DbContext(typeof(DollaWebContext))]
    [Migration("20191011022739_Transaction")]
    partial class Transaction
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DollaWeb.Models.Moneybox", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Amount");

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Icon");

                    b.Property<int>("MoneyBoxType");

                    b.Property<string>("Name");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.HasIndex("Username");

                    b.ToTable("MoneyBox");

                    b.HasDiscriminator<int>("MoneyBoxType");
                });

            modelBuilder.Entity("DollaWeb.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("TransactionDate");

                    b.Property<double>("TransferAmount");

                    b.Property<int?>("TransferFromId");

                    b.Property<int?>("TransferToId");

                    b.Property<string>("Type");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.HasIndex("Username");

                    b.ToTable("Transaction");
                });

            modelBuilder.Entity("DollaWeb.Models.User", b =>
                {
                    b.Property<string>("Username")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedDate");

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Password");

                    b.HasKey("Username");

                    b.ToTable("User");
                });

            modelBuilder.Entity("DollaWeb.Models.Envelope", b =>
                {
                    b.HasBaseType("DollaWeb.Models.Moneybox");

                    b.Property<double>("SetAmount");

                    b.HasDiscriminator().HasValue(1);
                });

            modelBuilder.Entity("DollaWeb.Models.PiggyBank", b =>
                {
                    b.HasBaseType("DollaWeb.Models.Moneybox");

                    b.Property<string>("test");

                    b.HasDiscriminator().HasValue(3);
                });

            modelBuilder.Entity("DollaWeb.Models.Bill", b =>
                {
                    b.HasBaseType("DollaWeb.Models.Envelope");

                    b.Property<int>("DayDue");

                    b.HasDiscriminator().HasValue(2);
                });

            modelBuilder.Entity("DollaWeb.Models.Moneybox", b =>
                {
                    b.HasOne("DollaWeb.Models.User")
                        .WithMany("moneyBoxID")
                        .HasForeignKey("Username");
                });

            modelBuilder.Entity("DollaWeb.Models.Transaction", b =>
                {
                    b.HasOne("DollaWeb.Models.User")
                        .WithMany("transactions")
                        .HasForeignKey("Username");
                });
#pragma warning restore 612, 618
        }
    }
}
